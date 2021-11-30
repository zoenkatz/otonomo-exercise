# Otonomo Exercise
Welcome to Otonomo, this repo contains a boilerplate for a short front end exercise.

In order to save some time, we have already initiated this repo with `create-react-app` and several basic components. 

## Instruction
You can start by forking this repo, complete the exercise and send us the a link to the forked repo.

## App Specification
Otonomo collects real-time car data, for example: fuel level, wiper fluid level, geolocation, etc.

In this exercise you should develop a tiny web app through which users can subscribe to vehicle events and display them in real time. Users should also be able to filter those events based on:
* VIN (Vehicle Identification Number - basically car ID) and,
* fuel level - in some cases users would like to know if the car fuel level is below certain threshold (for this exercise it will always be **15%**). 

The basic idea is fairly simple:
- [ ] Users can subscribe to VIN by entering the VIN and adding it to the watch list
- [ ] Events from those vehicles should be displayed in the main screen
- [ ] Users can turn off events from specific VINs
- [ ] Users can filter events by fuel level, displaying only events in which the fuel level is below 15%

This is how it should look like (roughly):
![mockup](https://raw.githubusercontent.com/otonomo/otonomo-exercise/master/otonomo-web-preview.png)

## Subscribing to events
We are using a `Streamer` instance to mock car events, nothing too fancy, just a class that receives a factory function and emits its output once in a while.

You can initiate such `Streamer` by importing `createCarStreamer` function from `car-data-streamer`, it receives a `VIN` (17 uppercase alphanumeric characters) and returns a streamer, like so:
```typescript
import createCarStreamer from './api/car-data-streamer'

const carStreamer = createCarStreamer('IFJRU974JFI100JC')
carStreamer.start()
```
	
	
### Streamer.subscribe(handler)
This is how you subscribe to car events:
```typescript
carStreamer.subscribe(carData => {
	// do something with car data
})
```

`carData` structure:
```json
 {
    vin, // the vin you entered
    timestamp: 43904830948, // event timestamp
    fuel: 0.23, // fuel level (max is 1)
    wiperFluid: 0.69, // wiper fluid level (max is 1)
    location: {lat: 34.94585948, lng: 48.48348}, // car coordinates
  }
```

### Streamer.start()
Will start to emit car events

### Streamer.stop()
You guessed it, will pause events emitting :)

### Streamer.removeHandler(handler)
Unsubscribe from car events

## Utility Components
Some of the required components have already been added for you:
- `Button`
- `Checkbox`
- `Input`
- `EventNotification` - this is a styled box that contains a single car event

You can play with the components by running `npm run storybook`

## App Mockup 
We really recommend you to focus on the app functionality rather than styling. After everything is working, it'd be great if you can make it look better (as a bonus).

Good luck!

