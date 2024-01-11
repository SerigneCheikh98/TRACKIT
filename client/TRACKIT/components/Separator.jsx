import { View, StyleSheet, Text } from "react-native"

const Separator = (props) => {
    return (<>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.lineStyle} />
            <View>
                <Text style={{ width: 50, textAlign: 'center' }}>{props.text}</Text>
            </View>
            <View style={styles.lineStyle} />
        </View>
    </>)
}

const styles = StyleSheet.create({
    lineStyle: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    }
})
export default Separator;