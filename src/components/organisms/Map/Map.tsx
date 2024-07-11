'use client'
import React from 'react'
import MapGl, { useMap } from 'react-map-gl'

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}

type IMapProps = React.ComponentProps<typeof MapGl> & { height?: string }

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: IMapProps) => {
  return (
    <MapGl
      {...props}
      mapStyle={'mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3'}
      mapboxAccessToken="pk.eyJ1IjoibWlycm9yMDUiLCJhIjoiY2x5YTFvNWZ0MDJndjJpc2Jtczd2eDhvbSJ9.HB8MJNnc-fFtha5xZlmujA"
      style={{ height }}
      pitch={22.5}
      scrollZoom={false}
      doubleClickZoom={false}
      initialViewState={{ latitude: 20, longitude: 78, zoom: 4.5 }}
    >
      <StyleMap />
      {props.children}
    </MapGl>
  )
}

export const StyleMap = () => {
  const { current: map } = useMap()

  map?.on('style.load', () => {
    map?.getMap().setFog({
      color: 'rgb(250,250,250)', // Lower atmosphere
      range: [1, 10],
      'high-color': 'rgb(200,200,200)', // Upper atmosphere
      'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(150, 150, 150)', // Background color
      'star-intensity': 0.5, // Background star brightness (default 0.35 at low zoooms )
    })
  })
  return null
}
