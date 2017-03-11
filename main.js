  window.onload = init;
  var app;

  function init() {
      enableUploadButton();
      enableClarifai();
  }

  function enableClarifai() {
      app = new Clarifai.App(
          'DFgMzmmiwr9VJIQtnNKI5DbEjSFnqBNjyTgEPcNI',
          'j5x9zLgm32JvmgmNrzfNEKw-bvPeLq8DTIZUnPH_'
      );
  }
  // predict the contents of an image by passing in a url
  function predict64Image(b64) {
      app.models.predict(Clarifai.GENERAL_MODEL, { base64: b64 }).then(
          function(response) {
              console.log("here", response);
              printOutput(response);
              c = response;
          },
          function(err) {
              console.error(err);
          }
      );
  }

  function printOutput(response) {
      var outputs = response.outputs;
      var ul = document.getElementById('results');
      while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
      }
      outputs.forEach(function(i) {
          i.data.concepts.forEach(function(j) {
              addItem(j.name, j.value);
          });
      });

  }

  function addItem(itemName, accuracy) {
      var li = document.createElement('li');
      var ul = document.getElementById('results');
      li.appendChild(document.createTextNode(itemName));
      li.style.opacity = accuracy;
      results.appendChild(li);

  }

  function stripResult(result) {
      return result.split(',')[1];
  }

  function previewFile() {
      var preview = document.querySelector('#preview');
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader();
      //loading
      var ul = document.getElementById('results');
      while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
      }
      addItem('Loading...');

      reader.addEventListener("load", function() {
          preview.style.backgroundImage = 'url("' + reader.result + '")';
          predict64Image(stripResult(reader.result));

      }, false);

      if (file) {
          reader.readAsDataURL(file);
      }
  }

  function enableUploadButton() {
      document.getElementById('image-upload-button').onclick = function() {
          document.getElementById('image-upload').click();
      };
  }

  function enableImageFitCover() {
      var preview = document.getElementById('preview');
      preview.onload = function() {
          console.log(this, this.width, this.height);
      };
  }