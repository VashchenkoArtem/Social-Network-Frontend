import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Modal } from "@shared/ui/modal";
import { View, Text } from "react-native";
import { styles } from "./styles";

export function RegistrationStepOne(){
    return (
        <View style={[{paddingTop: 39, paddingHorizontal: 16}]}>
			<Modal ifLogin={true}>
				<Text style = {styles.modalTitle}>Приєднуйся до World IT</Text>
				<View>
					<Input placeholder="you@example.com" label="Електронна пошта"/>
					<Input placeholder="Введи пароль" label="Пароль" isPassword={true}/>
					<Input placeholder="Повтори пароль" label="Підтверди пароль" isPassword={true}/>
				</View>
			
				
				<Button variant={'purple'} text= 'Створити акаунт' style = {[styles.button, styles.purple]} href="/regisration"></Button>
			</Modal>
		</View> 
    )
}