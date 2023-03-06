import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default function BubbleGraph({data}) {
    console.log(typeof(data))
    let bubbleChartData = [];
    Object.keys(data).map((key) => (
        bubbleChartData.push({label: key, value: data[key]})
    ))

    return (
        <BubbleChart
            graph= {{
                zoom: 1
            }}
            width={500}
            height={800}
            padding={0} // optional value, number that set the padding between bubbles
            showLegend={true} // optional value, pass false to disable the legend.
            legendPercentage={25} // number that represent the % of with that legend going to use.
            legendFont={{
                    family: 'Arial',
                    size: 12,
                    color: '#000',
                    weight: 'bold',
                }}
            valueFont={{
                    family: 'Arial',
                    size: 12,
                    color: '#fff',
                    weight: 'bold',
                }}
            labelFont={{
                    family: 'Arial',
                    size: 16,
                    color: '#fff',
                    weight: 'bold',
                }}
            data={bubbleChartData}
        />
    )
  }