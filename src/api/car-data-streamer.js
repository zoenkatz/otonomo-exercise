import createStreamerFrom from './streamer'
import generateCarData from './data-generator'

export default function createCarStreamer(vin) {
  return createStreamerFrom(() => generateCarData(vin))
}
