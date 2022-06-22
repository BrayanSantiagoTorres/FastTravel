import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "firebase";
import InputText from "../Inputs/InputsText.js";
import ButtonModal from "../buttons/ButtonModal.js";

const ChangeEmailForm = ({
  displayEmail,
  setReloadUserInfo,
  setShowModal
}) => {
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadig, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);

    if (!newEmail) {
      setError("El email no puede ser vacío");

      return;
    }
    let regexEAmail = new RegExp('^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$');

    if(!regexEAmail.test(newEmail)){
      setError("El email no es valido");
      return;
    }

    if (displayEmail === newEmail) {
      setError("El email no puede ser igual al actual");
      return;
    }
    setIsLoading(true);
    const user = firebase.auth().currentUser;
    user
    .updateEmail(newEmail)
    .then(() => {
      firebase.auth().currentUser.reload()

      setIsLoading(false);
      setReloadUserInfo(true);
      setShowModal(false);
    })
    .catch((e) => {
      if(e.code =="auth/requires-recent-login"){
        setError("Debes iniciar session nuevamente para actualizar tu contraseña");
        setIsLoading(false);
      }
      });
  };
  return (
    <View style={styles.view}>
      <InputText
        placeholder="Nuevo Email"
        icon={{
          type: "material-community",
          name: "email",
          color: "#040059",
        }}
        value={newEmail || ""}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        error={error}
      />

      <ButtonModal text="Cambiar e-mail" isLoadig={isLoadig} onPress={onSubmit} />
    </View>
  );
};
export default ChangeEmailForm;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: '#040059'


  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: 'red',
    color: '#040059'
  },
});