const filenames = [
        'images/daniele-levis-pelusi-311027-unsplash.jpg',
        'images/guy-stevens-746794-unsplash.jpg',
        'images/sharon-pittaway-98257-unsplash.jpg'
      ];

      catchRainbows(filenames)
        .then(response => {
          console.log('yay');
        })
        .catch(error => {
          console.log('error!');
          console.error(error);
        });

      async function catchRainbows(filenames) {
        for (let filename of filenames) {
          const response = await fetch(filename);
          const blob = await response.blob();
          const img = document.createElement('img');
          img.src = URL.createObjectURL(blob);
          img.width = '200';
          document.body.append(img);
        }
      }