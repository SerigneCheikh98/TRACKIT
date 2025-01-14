import { useEffect, useState } from "react"
import { KeyboardAvoidingView, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Card, Avatar, IconButton } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { View } from "react-native"
import { Text, Button } from "react-native-paper"
import Popup from './Popup';
import TopBar from "./TopBar"
import API from "../API"
import Separator from "./Separator"

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
    const [showUpgradeCard, setShowUpgradeCard] = useState(false);

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

    function handleDeleteUpgrade() {
        API.deleteRequest()
            .then(() => {
                setDirty(true)
                setShowUpgradeCard(false)
                closePopup()
            })
            .catch(err => console.log(err))
    }

    const [bookingsSeen, setBookingsSeen] = useState([]);
    const [bookingsNotSeen, setBookingsNotSeen] = useState([]);


    useEffect(() => {
        API.getNotification()
            .then(result => {
                // setBookings(result)
                const seen = result.filter(item => item.seen == 1)
                setBookingsSeen(seen)
                const notSeen = result.filter(item => item.seen == 0)
                setBookingsNotSeen(notSeen)

                setDirty(false)
            })
            .catch(err => console.log(err))

        API.getStudent().then((student) => {
            console.log(student)
            if( student.driverRequesState === 1){
                // show the card
                setShowUpgradeCard(true);
            }
            else{
                setShowUpgradeCard(false);
            }
        }).catch(err => console.log(err));
        
    }, [dirty, showUpgradeCard])
    
    const noNotificationMsg = Math.random()*100 <= 80 ? `You don't have any activity yet` : `If you think it's sad because there are no notifications look at you first`
    return (
        <SafeAreaProvider style={{
            backgroundColor:'white'
        }}>
            <TopBar back = {'x'} />
                <ScrollView>
                    <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text={popupText} buttons={popupFn} />
                    {showUpgradeCard && <View style={{paddingVertical: '2%'}}>
                        <UpgradeCard handleDeleteUpgrade={handleDeleteUpgrade} throwPopup={throwPopup} closePopup={closePopup} />
                    </View>}
                    {(showUpgradeCard && bookingsNotSeen.length!=0 || bookingsSeen.length!=0) && <Separator text={'Rides'} />}
                    { 
                        bookingsNotSeen.length == 0 &&
                        bookingsSeen.length == 0 &&
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', padding: '10%', paddingTop: 0}}>
                            <Text>{noNotificationMsg}</Text>
                        </View>    
                    }
                    <View style={{paddingVertical: '2%'}}>
                        {
                            bookingsNotSeen.map((booking, index) => {
                                let val = <></>
                                API.setNotificationSeen(booking.id)
                                    .then(resp => {
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                    return <CardBooking handleDeleteNotification={handleDeleteNotification} key={index} id={booking.bookingId} date={booking.Date} driverName={booking.driverName} time={booking.time} duration={booking.duration} state={booking.state} throwPopup={throwPopup} closePopup={closePopup} />
                            })
                        }
                    </View>
                    
                        {
                            bookingsSeen.length != 0 && bookingsNotSeen.length != 0 &&
                            <Separator text={'Old '} />
                        }
                    <View style={{paddingVertical: '2%'}}>
                        {
                            bookingsSeen.map((booking, index) => (
                                <CardBooking handleDeleteNotification={handleDeleteNotification} key={index} id={booking.bookingId} date={booking.Date} driverName={booking.driverName} time={booking.time} duration={booking.duration} state={booking.state} throwPopup={throwPopup} closePopup={closePopup} />
                                ))
                            }
                    </View>
                  
                </ScrollView>
        </SafeAreaProvider>
    )
}

const CardBooking = (props) => {

    let msg
    //used for the pop up when the booking/request is cancelled
    if (props.state = "Pending") {
        msg = 'Are you sure you want to cancel the request?'
    }
    else {
        msg = 'Are you sure you want to cancel your booking'
    }
    return (
        <Card style={{ width: "90%", marginLeft: "5%", flex: 1, height: "100%", marginTop: "7%",}}>
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


                {props.state == "Pending" && <Text variant='bodySmall' style={{ paddingLeft: "7%", paddingTop: "7%",  }}>Estimated response time: 3-4 hours</Text>}
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

const UpgradeCard = (props) => {
    let msg = 'Are you sure you want to cancel the request?';
    
    return (
        <Card style={{ width: "90%", marginLeft: "5%", flex: 1, height: "100%" }}>
            <Card.Title
                title="Upgrade to Instructor Request"
                subtitle="Pending"
                left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: '#1F1937' }} icon="reflect-vertical" />}
            />
            <Card.Content>
                <Text variant="bodyMedium">Your request is still being processed by our team.</Text>
                <Text variant='bodySmall'>Estimated response time: 3-4 working days</Text>
            </Card.Content>
            <Card.Actions>
                <Button style={styles.buttonSubmit} textColor="white" onPress={() => {
                    props.throwPopup(msg, [{
                        name: "Cancel Upgrade",
                        fn: () => props.handleDeleteUpgrade()
                    },
                    {
                        name: 'Close',
                        fn: props.closePopup
                    }])
                }}>
                    Cancel Upgrade
                </Button>
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
        borderWidth: 0,
        marginTop: '10%',
        width: "60%",
        marginLeft: "60%",
    },
    container:
    {
        flex: 1,
        borderRadius:5,
        backgroundColor:"#FFFFFF",
        height:"100%"
       
    },
})

export default NotificationPage