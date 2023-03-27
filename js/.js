Morris.Bar({
    element: 'bar-example',
    barColors: ['#e13304','#2100b7'],
    gridTextColor: ['white'],
  
    data: [
      { y: 'เมนู 1', a: 100, b: 90 },
      { y: 'เมนู 2', a: 75,  b: 65 },
      { y: 'เมนู 3', a: 50,  b: 40 },
      { y: 'เมนู 4', a: 75,  b: 65 },
      { y: 'เมนู 5', a: 50,  b: 40 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
  });
  
  Morris.Donut({
      element: 'donut-example',
      colors: ['orange', 'red','green','blue','white'],
  
      data: [
        {label: "เมนู1",value: 12},
        {label: "เมนู2", value: 30},
        {label: "เมนู3", value: 5},
        {label: "เมนู4", value: 20},
        {label: "เมนู5", value: 40},
      ],
      labelColor: 'white',
    });