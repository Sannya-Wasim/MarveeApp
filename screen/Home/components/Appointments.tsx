import { FlatList, View, Text, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { WHITE_10, BLACK, WHITE } from '../../../util/color';
import GlobalStyle from '../../../util/styles';

const Appointments = ({ data, navigation }: any) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: WHITE_10,
            borderRadius: scale(10),
            padding: 10,
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: scale(10),
              borderBottomWidth: 1,
              borderBottomColor: BLACK,
            }}
          >
            <Text style={{ fontSize: scale(15), color: BLACK }}>
              Date: {new Date(item?.appointmentDate).toLocaleDateString()}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: scale(10),
              flexWrap: 'wrap',
              padding: scale(8),
            }}
          >
            <View style={{ flexBasis: '100%', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                  fontWeight: 'bold',
                  marginRight: scale(5),
                }}
              >
                Marvee:
              </Text>
              <Text style={{ fontSize: scale(15), color: BLACK }}>
                {item.marviName}
              </Text>
            </View>

            <View style={{ flexBasis: '100%', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                  fontWeight: 'bold',
                  marginRight: scale(5),
                }}
              >
                Area:
              </Text>
              <Text style={{ fontSize: scale(15), color: BLACK }}>
                {item?.address}
              </Text>
            </View>

            {/* <View style={{ flexDirection: 'row', padding : 10 }}> */}
              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                  fontWeight: 'bold',
                  marginRight: scale(5),
                }}
              >
                Purpose of Visit:
              </Text>

              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                //   flexShrink: 1, // 👈 fixes overflow
                }}
              >
                {item?.serviceRequest}
              </Text>
            {/* </View> */}

            <View style={{ flexBasis: '100%', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                  fontWeight: 'bold',
                  marginRight: scale(5),
                }}
              >
                Patients Checked:
              </Text>
              <Text
                style={{
                  fontSize: scale(15),
                  color: BLACK,
                  fontWeight: 'bold',
                }}
              >
                24
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: BLACK,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate('CallScreen', { id: item?.marviId })
              }
              style={[
                GlobalStyle.filedButton,
                {
                  backgroundColor: '#00953C',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexBasis: '48%',
                },
              ]}
            >
              <Text style={GlobalStyle.filedButtonText}>Consult Patient</Text>
            </Pressable>

            <Pressable
              style={[
                GlobalStyle.filedButton,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexBasis: '48%',
                },
              ]}
            >
              <Icon name="x" color={WHITE} size={20} />
              <Text style={GlobalStyle.filedButtonText}>End Visit</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default Appointments;
