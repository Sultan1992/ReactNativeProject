
 

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component
{
     
    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Card wrapperStyle={{ margin: 20 }}
                    title={"Contact Information"}>
              
                    <Text Style={{ marginBottom: 10 }}>
                        1 Nucamp Way
                       Seattle, WA 98001
                        U.S.A.
                    </Text>
                    <Text>
                    Phone: 1-206-555-1234
                    Email: campsites@nucamp.co

                    </Text>
                    
                            
                </Card>
           </ScrollView>
        )
    }
}


export default Contact;