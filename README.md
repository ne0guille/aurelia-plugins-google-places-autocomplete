# aurelia-google-places

A Google Places Autocomplete plugin for Aurelia.

This plugin is a custom element build with the **Google Places AutocompleteService** instead of the Google Places Autocomplete class. You can use this plugin easily in a form and don't have to deal with the asynchronous `placed_changed` event. Simply bind a `value` to the element to get the value of the input in your form. The downside is that you still need to do your own geocoding if you want to have geographic coordinates of the address. Luckily, this can be easily done with the Google Geocoder.

## Installation

**Webpack/Aurelia CLI**

```shell
npm install aurelia-google-places --save
```

**JSPM**

```shell
jspm install aurelia-google-places
```

**Bower**

```shell
bower install aurelia-google-places
```

## Configuration

Add to `package.json`

```json
  "aurelia": {
    "build": {
      "resources": [
        "aurelia-google-places"
      ]
    }
  }
```

Inside of your `main.js` or `main.ts` file simply load the plugin inside of the configure method using `.plugin()`.

```javascript
export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use
    .plugin('aurelia-google-places', config => {
      config.options({
        apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded', // if loadApiScript is false, the event that is subscribed to to know when the Google Maps API is loaded by another plugin
        key: '', // your Google API key retrieved from the Google Developer Console
        language: 'es', // see https://developers.google.com/maps/documentation/javascript/localization
        libraries: 'places', // see https://developers.google.com/maps/documentation/javascript/libraries
        loadApiScript: true|false, // whether or not the <script> tag of the Google Maps API should be loaded
        options: { types: ['geocode'] } // see https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
      });
    });

    await aurelia.start();
    aurelia.setRoot('app');
}
```

## Usage

Once Google Places Autocomplete is configured, to use it simply add the custom element `<aup-google-places></aup-google-places>` in your view.

### Google Maps API loaded

The `aurelia-plugins:google-places-autocomplete:api-script-loaded` event is published when the Google Maps API Script is completely loaded. A Promise is returned as payload. This event is used together with other Aurelia Plugins in combination with the option `loadApiScript=false` to make sure the Google Maps API Script is loaded only once.

Google Places Autocomplete needs at least the library `places`. Perhaps the other Aurelia Plugin that loads the Google Maps API Script doesn't include the library `places` by default. If so, add it to the `libraries` option of the other Aurelia Plugin.


### Get the input value

Bind the `value` attribute to `<aup-google-places></aup-google-places>` to get the value selected from the Google Places AutocompleteService. Do your own geocoding if necessary. You can also easily validate the value with `aurelia-validation`.

```html
<form submit.delegate="onSubmit()">
  <aup-google-places value.bind="value"></aup-google-places>
  <button type="submit">Submit</button>
</form>
```

```javascript
export class App {
  value = '';
  
  async onSubmit() {
    var place = await this.geocode(this.value);
    console.log(place);
  }
  
  geocode(value) {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({ address: value }, (results, status) => {
        status === google.maps.GeocoderStatus.OK ? resolve(results[0]) : reject();
      });
    });
  }
}
```

### Other attributes

The other attributes that can be used on `<aup-google-places></aup-google-places>` are:

* `placeholder`: The placeholder shown on the input.
* `selectClass`: The CSS class added to the selected item in the autocomplete when using up and down keys.
