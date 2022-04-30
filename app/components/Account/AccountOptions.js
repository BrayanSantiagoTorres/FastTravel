import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key) =>{
      switch(key){
        case 'displayName':
            setRenderComponent(
              <ChangeDisplayNameForm
                  displayName={userInfo.displayName}
                  setShowModal={setShowModal}
                  toastRef={toastRef}
                  setReloadUserInfo = {setReloadUserInfo}
              />
            )
            setShowModal(true)
            break
        case 'displayEmail':
          setRenderComponent(
            <ChangeEmailForm
                  email={userInfo.email}
                  setShowModal={setShowModal}
                  toastRef={toastRef}
                  setReloadUserInfo = {setReloadUserInfo}
            />
          )
          setShowModal(true)
          break;
            case 'displayPassword':
              setRenderComponent(<Text>Cambiando el password</Text>)
              setShowModal(true)
              break
            default:
              setRenderComponent(null)
              setShowModal(false)
              break
        }
    }
    const menuOptions = generateOptions(selectedComponent)

  return (
    <View>
      {menuOptions.map((menu, index)=>(
          <ListItem key={index} bottomDivider onPress={menu.onPress}>
              <Icon name = {menu.iconNameLeft}/>
              <ListItem.Content>
                  <ListItem.Title>{menu.title}</ListItem.Title>
              </ListItem.Content>
          </ListItem>
      ))}
      {renderComponent && (
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
      </Modal>
      )}
    </View>
  )
}

function generateOptions(selectedComponent){
  return [
    {
      title: 'Editar usuario y apellidos',
      iconNameLeft: 'account-circle',
      onPress: () => selectedComponent('displayName')
    },
    {
      title: 'Actualizar mi correo',
      iconNameLeft: 'drafts',
      onPress: () => selectedComponent('displayEmail')
    },
    {
      title: 'Cambiar mi contraseña',
      iconNameLeft: 'lock',
      onPress: () => selectedComponent('displayPassword')
    }
  ]
}

const styles = StyleSheet.create({
  selectedComponent:{
    textDecorationColor: '#D35400'
},


})