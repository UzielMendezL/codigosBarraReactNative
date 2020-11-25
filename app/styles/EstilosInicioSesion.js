import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  buttonContainer:
  {
    backgroundColor: '#002f6c'
  },
  separateButtonContainer:
  {
    margin: 10
  },
  input: {

    height: 40,
    width: 300,
    paddingHorizontal: 5,
    paddingLeft: 5,
    marginBottom: 5,
    borderRadius: 25
  },
  errorInputMessage: {
    opacity: 0
  },
  inputContainer: {
    paddingLeft: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  sizeImg:
  {
    width: 200,
    height: 200
  },
  containerImg:
  {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',

  },
  changeLineInput:
  {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    color: 'red'
  },
  error:
  {
    textAlign: 'center',
    height: 17.5
  },
  header: {
    height: "30%"
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#01579b'
  },
});