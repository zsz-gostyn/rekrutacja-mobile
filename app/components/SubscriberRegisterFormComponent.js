import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Alert } from 'react-native';
import { Input, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { API_URL } from 'app/config/AppConfig';
import ErrorComponent, { ErrorType } from 'app/components/errors/ErrorComponent';
import HyperlinkComponent from 'app/components/HyperlinkComponent';

export default class SubscriberRegisterFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
      error: ErrorType.NONE, 

      // Form data
      firstNameValue: '',
      firstNameValidation: null,
      surnameValue: '',
      surnameValidation: null,
      emailValue: '',
      emailValidation: null,
      selectedSchoolValue: '',
      selectedSchoolValidation: null,
      customSchoolNameValue: '',
      customSchoolNameValidation: null,
    };
  }
  
  async componentDidMount() {
    try {
      let response = await fetch(API_URL + '/schools');
      response = await response.json();

      this.setState({
        schools: response.data,
      });

    } catch (error) {
      this.setState({
        error: ErrorType.NETWORKING,
      });
    }
  }
  
  formReset() {
    this.setState({
      firstNameValue: '',
      firstNameValidation: null,
      surnameValue: '',
      surnameValidation: null,
      emailValue: '',
      emailValidation: null,
      selectedSchoolValue: '',
      selectedSchoolValidation: null,
      customSchoolNameValue: '',
      customSchoolNameValidation: null,
    });
  }

  async subscriberRegisterAction() {
    try {
      let formValid = this.validateForm();

      if (formValid) {
        // Clone data that will be cleared by form reset
        const formData = {
          firstName: this.state.firstNameValue,
          surname: this.state.surnameValue,
          email: this.state.emailValue,
          selectedSchool: this.state.selectedSchoolValue,
          customSchoolName: this.state.customSchoolNameValue
        };

        this.formReset();

        // Prepare school for adding subscriber
        let schoolId;
        
        if (formData.selectedSchool === 'other') {
          let response = await fetch(API_URL + '/schools', {
            method: 'POST',
            body: JSON.stringify({ name: formData.selectedSchool }),
          });
          
          if (response.ok !== true || response.status != 201) {
            Alert.alert(
              'Problem komunikacji z serwerem',
              'Wystąpił problem komunikacji z serwerem. Skontaktuj się z administratorem.'
            );

            return;
          }

          schoolId = (await response.json()).data.id;
        } else {
          const school = this.state.schools.find((element) => {
            if (element.name === formData.selectedSchool) {
              return element;
            }
          });

          schoolId = school.id;
        }

        // Add new subscriber
        const subscriber = {
          'first_name': formData.firstName,
          'surname': formData.surname,
          'email': formData.email,
          'school': schoolId,
        };
        console.log(subscriber);
        const response = await fetch(API_URL + '/subscribers', {
          method: 'POST',
          body: JSON.stringify(subscriber)
        });

        if (response.ok !== true && response.state !== 201) {
          Alert.alert(
            'Problem komunikacji z serwerem',
            'Wystąpił problem komunikacji z serwerem. Skontaktuj się z administratorem.'
          );

          return;
        }

        Alert.alert(
          'Pomyślnie zarejestrowano',
          'Pomyślnie zarejestrowano! Sprawdź swoją skrzynkę e-mail.'
        );

      } else {
        Alert.alert(
          'Niepoprawne dane w formularzu',
          'Sprawdź, czy poprawnie uzupełniłeś poszczególne pola. Zastosuj się do wskazówek, które znajdują się pod danymi polami.',
        );
      }
    } catch (error) {
      this.setState({
        error: ErrorType.NETWORKING,
      });
    }
  }

  validateForm() {
    const validationResult = {};

    // Validate inputs
    const inputs = [
      {
        name: 'firstName',
        regex: /^[A-ZŻÓŁĆĘŚĄŹŃa-zżółćęśąźń]+$/,
      },
      {
        name: 'surname',
        regex: /^[A-ZŻÓŁĆĘŚĄŹŃa-zżółćęśąźń]+$/,
      },
      {
        name: 'email',
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      {
        name: 'customSchoolName',
        regex: /^[A-ZŻÓŁĆĘŚĄŹŃa-zżółćęśąźń0-9\ \.]+$/,
      },
    ];

    inputs.forEach((input) => {
      validationResult[input.name + 'Validation'] = input.regex.test(this.state[input.name + 'Value']);
    });

    // Validate pickers
    const pickers = [
      'selectedSchool'
    ];

    pickers.forEach((picker) => {
      validationResult[picker + 'Validation'] = this.state[picker + 'Value'] !== '';
    });

    this.setState(validationResult);

    // validationResult is used instead of this.state due to JS asynchrony
    const valid =
      validationResult.firstNameValidation &&
      validationResult.surnameValidation &&
      validationResult.emailValidation &&
      validationResult.selectedSchoolValidation &&
      (this.state.selectedSchoolValue !== 'other' || validationResult.customSchoolNameValidation) // Validation result includes only validation results, so I get field value from this.state
    ;

    return valid;
  }

  getFieldStyle(name, stylesList = []) {
    if (this.state[name + 'Validation'] === false) {
      stylesList.push(styles.error);
    }

    return stylesList;
  }

  render() {
    if (this.state.error !== ErrorType.NONE) {
      return <ErrorComponent type={this.state.error} />
    }

    let schools = this.state.schools.map(item => (
      <Picker.Item label={item.name} value={item.name} key={item.id} /> 
    ));

    return (
      <KeyboardAwareScrollView>
        <View>
          <Input
            placeholder="Imię"
            onChangeText={firstNameValue => this.setState({ firstNameValue })}
            value={this.state.firstNameValue}
            style={this.getFieldStyle('firstName', [styles.input])}
          />

          { this.state.firstNameValidation === false && <Text style={styles.errorMessage}>Imię nie może być puste i może składać się wyłącznie z liter</Text> }
        </View>
        
        <View>
          <Input
            placeholder="Nazwisko"
            onChangeText={surnameValue => this.setState({ surnameValue })}
            value={this.state.surnameValue}
            style={this.getFieldStyle('surname', [styles.input])}
          /> 
          
          { this.state.surnameValidation === false && <Text style={styles.errorMessage}>Nazwisko nie może być puste i może składać się wyłącznie z liter</Text> }
        </View>
        
        <View>
          <Input
            placeholder="E-mail"
            onChangeText={emailValue => this.setState({ emailValue })}
            value={this.state.emailValue}
            style={this.getFieldStyle('email', [styles.input])}
          />

          { this.state.emailValidation === false && <Text style={styles.errorMessage}>Podaj poprawny adres email</Text> } 
        </View>
        
        <View style={this.getFieldStyle('selectedSchool', [styles.picker])}>
          <Picker
            mode="dropdown"
            selectedValue={this.state.selectedSchoolValue}
            onValueChange={(selectedSchoolValue, selectedSchoolIndex) => this.setState({ selectedSchoolValue })}
          >
            <Picker.Item label="Wybierz swoją aktualną szkołę" value="" />
            {schools}
            <Picker.Item label="Mojej szkoły nie ma na liście" value="other" />
          </Picker>
        </View>
        { this.state.selectedSchoolValidation === false && <Text style={styles.errorMessage}>Należy wybrać szkołę</Text> }

        {
          this.state.selectedSchoolValue === 'other' &&
          <View>
            <Input
              placeholder='Nazwa szkoły'
              onChangeText={customSchoolNameValue => this.setState({ customSchoolNameValue })}
              value={this.state.customSchoolNameValue}
              style={this.getFieldStyle('customSchoolName', [styles.input])}
            />
            
          { this.state.customSchoolNameValidation === false && <Text style={styles.errorMessage}>Nazwa szkoły nie może być pusta i może składać się wyłącznie z liter, cyfr oraz spacji i kropek</Text> }

          </View>
        }
        
        <View style={styles.privacyInfo}>
          <Text>
            Wypełnienie formularza oznacza, że podane w nim dane osobowe będą przetwarzane w celu przesłania informacji o rekrutacji oraz kontaktu w jej sprawie.
          </Text>
          <HyperlinkComponent content="Dowiedz się kto i jak przetwarza twoje dane" onPress={() => this.props.navigation.navigate('privacyPolicy')} />
          <Text style={{ fontWeight: 'bold' }}>
            Pamiętaj, aby po utworzeniu konta potwierdzić rejestrację. Odpowiedni link otrzymasz na swój adres e-mail. W przeciwnym wypadku Twoje konto zostanie usunięte.
          </Text>
        </View>

        <View style={styles.buttonsView}>
          <Button style={styles.button} onPress={() => this.subscriberRegisterAction()}>
            <Text style={styles.buttonText}>
              Zarejestruj się
            </Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#F0F0F0',
  },
  picker: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#F0F0F0',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    padding: 15,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  error: {
    backgroundColor: '#f9a19f',
    borderColor: '#d17e7d',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#d85452',
    marginBottom: 10,
  },
  successMessage: {
    textAlign: 'center',
    color: '#4f9131',
  },
  formMessage: {
    fontSize: 16,
    padding: 10,
  },
  privacyInfo: {
    margin: 10
  }
});
