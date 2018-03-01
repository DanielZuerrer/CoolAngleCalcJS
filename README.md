# Cool Angle Calc Documentation

## Technology

The project is written in HTML, CSS and JavaScript. Is is available for use at http://cool-angle-calc.herokuapp.com/. To deploy the static project a simple PHP file is used which acts as the entry point of the program.

### Used Libraries

The project uses the following libraries which are all available under the MIT licence.

- [jQuery](https://jquery.org)
- [jQuery UI](https://jqueryui.com)
- [Propeller JS](http://pixelscommander.com/polygon/propeller)

## Modules

The JavaScript code is split into four modules, each with their own responsibilities.

### imageHandling.js

This module handles any operations concerning the display of images. It offers the following functionality:

- file selectors/drop boxes for up to two images
- replacing an image
- switching between images

### angle.js

This module handles the manipulation, calculation and display of the resulting angle. It offers the following functionality:

- rotation and resizing of the pattern
- rotation of the (green line)
- display of the (red line) and (green line) with the resulting angle
- calculation of the resulting angle

### controls.js

This module handles the basic controls of the program. It offers the following functionality:

- flipping the pattern between left and right orientation
- selecting the modality
- adding keyboard shortcuts for flipping the pattern, replacing an image and switching between images

### save.js

This module handles the saving mode of the program. It offers the following functionality:

- toggle save mode (display two images side by side, hiding unneeded controls)
- creating title from user inputs