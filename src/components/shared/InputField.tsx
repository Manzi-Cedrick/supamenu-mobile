import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { View, Text} from '@/components/shared/Themed';
interface InputFieldProps extends TextInputProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    prefix?: string;
}


const InputField: React.FC<InputFieldProps> = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    prefix,
    error,
    ...props
}: {
    title: string,
    value: string,
    placeholder: string,
    handleChangeText: (text: string) => void,
    otherStyles?: string,
    prefix?: string,
    error?: string,
    props?: any
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-sm text-slate-900 font-medium">{title} <Text className="text-red-500">*</Text></Text>

            <View className="w-full py-2.5 px-4 rounded-lg border border-slate-200 focus:border-secondary flex flex-row items-center">
                {prefix && (
                    // @ts-ignore
                    <FontAwesome name={prefix} size={16} color="grey" style={{ marginRight: 8 }} />
                )}
                <TextInput
                    className="flex-1 text-black text-sm"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            className="w-6 h-6"
                        >
                            {showPassword ? (
                                <FontAwesome name="eye" size={16} color="grey" />
                            ) : (
                                <FontAwesome name="eye-slash" size={16} color="grey" />
                            )}
                        </Pressable>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputField;