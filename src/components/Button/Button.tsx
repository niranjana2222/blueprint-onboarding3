import { Button as RNButton } from '@rneui/themed';
import styles from './styles';

type ButtonProps = {
  disabled: boolean;
  text: string;
  onPress: () => void;
};

function Button({ disabled, onPress, text }: ButtonProps) {
  return (
    <RNButton
      disabledStyle={styles.disabledStyle}
      buttonStyle={styles.buttonStyle}
      disabledTitleStyle={styles.disabledTitleStyle}
      titleStyle={styles.titleStyle}
      title={text}
      disabled={disabled}
      onPress={onPress}
    />
  );
}

export default Button;
