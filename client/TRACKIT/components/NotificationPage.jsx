import { useEffect, useState } from "react"
import { KeyboardAvoidingView, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Card, Avatar, IconButton } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { View } from "react-native"
import { Text, Button } from "react-native-paper"
import Popup from './Popup';
import TopBar from "./TopBar"
import API from "../API"

//assume we have props: bookings for each user
//so we have a list of bookings
//each booking has  a state
//if state = pending the card looks different since there's no driver name


const NotificationPage = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [popupText, setPopupText] = useState('')
    const [popupFn, setPopupFn] = useState([{
        name: '',
        fn: () => { }
    }])
    const [dirty, setDirty] = useState(false)

    function throwPopup(text, buttons) {
        setModalVisible(true)
        setPopupText(text)
        setPopupFn(buttons)
    }

    function closePopup() {
        setModalVisible(false)
    }

    function handleDeleteNotification(id, state) {
        API.deleteNotification(id, state)
            .then(resp => {
                setDirty(true)
                closePopup()
            })
            .catch(err => console.log(err))
    }
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        API.getNotification()
            .then(result => {
                setBookings(result)
                setDirty(false)
            })
            .catch(err => console.log(err))
    }, [dirty])
    return (
        <SafeAreaProvider>
            <TopBar navigation={navigation} />
            <KeyboardAvoidingView>
                <ScrollView>
                    <SafeAreaView>
                        <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text={popupText} buttons={popupFn} />
                        <View>

                            {bookings.map((booking, index) => (
                                <CardBooking handleDeleteNotification={handleDeleteNotification} key={index} id={booking.bookingId} date={booking.Date} driverName={booking.driverName} time={booking.time} duration={booking.duration} state={booking.state} throwPopup={throwPopup} closePopup={closePopup} />


                            ))}




                        </View>
                    </SafeAreaView>
                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaProvider>
    )
}

const CardBooking = (props) => {

    let msg
    //used for the pop up when the booking/request is cancelled
    if (props.state = "Pending") {
        msg = 'Your request has been cancelled'
    }
    else {
        msg = 'Your booking has been cancelled'
    }
    return (
        <Card style={{ width: "90%", marginLeft: "5%", flex: 1, height: "100%", marginTop: "7%" }}>
            <Card.Title

                title={props.state == "Pending" ? 'Pending Request' : "Upcoming Booking"}
                subtitle={props.driverName != null ? `Driver: ${props.driverName}` : "Trying to match you to a driver..."}


                left={(propses) => <Avatar.Icon {...propses} style={{ backgroundColor: '#1F1937' }} icon={props.state == "Pending" ? 'reflect-vertical' : 'checkbox-marked-circle'} />}
            />
            <Card.Content>
                <Text variant="bodySmall">{`
     Date: ${props.date}          Duration: ${props.duration}
     
     Time: ${props.time}`}
                </Text>


                {props.state == "Pending" && <Text variant='bodySmall' style={{ paddingLeft: "7%", paddingTop: "7%" }}>Estimated response time: 3-4 hours</Text>}
            </Card.Content>
            <Card.Actions>
                <Button style={styles.buttonSubmit} textColor="white" onPress={() => {
                    props.throwPopup(msg, [{
                        name:  props.state == "Pending" ? "Cancel Request" : "Cancel Booking",
                        fn: () => props.handleDeleteNotification(props.id, props.state)
                    },
                    {
                        name: 'Close',
                        fn: props.closePopup
                    }])
            }}>{
                        props.state == "Pending" ?
                            "Cancel Request" : "Cancel Booking"}</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    buttonSubmit:
    {
        backgroundColor: "#1F1937",
        padding: '1%',
        borderRadius: 10,
        // alignItems: 'center',
        marginTop: '10%',
        width: "60%",
        marginLeft: "60%",
    }
})

export default NotificationPage