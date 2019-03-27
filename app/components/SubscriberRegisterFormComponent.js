import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Input, Button } from 'native-base';

import { API_URL } from 'app/config/AppConfig';
import ErrorComponent, { ErrorType } from 'app/components/errors/ErrorComponent';

export default class SubscriberRegisterFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
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
      displayFormMessage: false,
      formState: null, // If null - not displaying the message; if true - message is green; if false - message is red
      formMessage: '',
      error: ErrorType.NONE,
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

  async subscriberRegisterAction() {
    try {
      let formValid = this.validateForm();

      if (formValid) {
        // Prepare school for adding subscriber
        let schoolId;
        
        if (this.state.selectedSchoolValue === 'other') {
          let response = await fetch(API_URL + '/schools', {
            method: 'POST',
            body: JSON.stringify({ name: this.state.customSchoolNameValue }),
          });
          
          if (response.ok !== true || response.status != 201) {
            this.setState({
              formMessage: 'Problem komunikacji z serwerem',
              formState: false,
            });

            return;
          }

          schoolId = (await response.json()).data.id;
        } else {
          const school = this.state.schools.find((element) => {
            if (element.name === this.state.selectedSchoolValue) {
              return element;
            }
          });

          schoolId = school.id;
        }

        // Add new subscriber
        const subscriber = {
          "first_name": this.state.firstNameValue,
          "surname": this.state.surnameValue,
          "email": this.state.emailValue,
          "school": schoolId,
        };

        const response = await fetch(API_URL + '/subscribers', {
          method: 'POST',
          body: JSON.stringify(subscriber)
        });

        if (response.ok !== true && response.state !== 201) {
          this.setState({
            formMessage: 'Problem komunikacji z serwerem',
            formState: false,
          });

          return;
        }

        this.setState({
          formMessage: 'Pomyślnie dodano nowego subskrybenta!',
          formState: true,
        });

      } else {
        this.setState({
          formMessage: 'Błąd walidacji formularza',
          formState: false,
        });
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
      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={200}>
        {
          this.state.formState !== null &&
          <View>
            <Text style={[styles.formMessage, this.state.formState ? styles.successMessage : styles.errorMessage]}>
              {this.state.formMessage}
            </Text>
          </View>
        }
        
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

        <View style={styles.buttonsView}>
          <Button style={styles.button} onPress={() => this.subscriberRegisterAction()}>
            <Text style={styles.buttonText}>
              Zarejestruj się
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
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
  }
});
