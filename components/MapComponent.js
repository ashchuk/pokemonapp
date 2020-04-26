import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import generateRandomPokemon from '../utils/randomPokemon'

const INTERVAL= 4000
const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trainer: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },
      pokemon: []
    }

    this.locationWatcher = null
    this.spawnInterval = null

    this.spawnWildPokemon = this.spawnWildPokemon.bind(this)
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(permission => {
        if(permission.status === 'granted') {
          this.locationWatcher = Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 500,
          }, (location) => {
            this.setState({
              trainer: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta,
                longitudeDelta,
              }
            })
          })

          this.spawnInterval = setInterval(this.spawnWildPokemon, INTERVAL)
        }
        else {
          console.warn('PERMISSION DENIED')
        }
      })
      .catch(e => console.error(e))
  }

  componentWillUnmount() {
    this.locationWatcher && this.locationWatcher.remove()
    this.spawnInterval && clearInterval(this.spawnInterval)
  }

  spawnWildPokemon() {
    const location = this.state.trainer

    let newPokemon = generateRandomPokemon(3, location)

    if (this.state.pokemon.length) {
      newPokemon = newPokemon.concat(this.state.pokemon.slice(0, 3))
    }

    this.setState({
      pokemon: newPokemon
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.trainer}
          scrollEnabled={false}
          showsTraffic={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
        >
          <MapView.Marker
            key={'trainer'}
            image={require('../assets/images/trainer.png')}
            coordinate={this.state.trainer}
          />

          {this.state.pokemon.map(p =>
            <MapView.Marker
              key={`${p.latitude}::${p.longitude}`}
              coordinate={p}
              onPress={() => {
                this.props.navigator.push('Root', {
                  title: 'Pokemon Map',
                  index: 0,
                  screen: 'Camera',
                  params: { pokemon: p }
                })
              }}
            >
              <Image source={p.image} />
            </MapView.Marker>
          )}
        </MapView>

        <View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.trainer.latitude.toPrecision(7)}, ${this.state.trainer.longitude.toPrecision(7)}`}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
})

