# Static Gallery

Built with love using React.js, Redux and Webpack!

## Demo

Check below screenshots:

![home screen](https://cloud.githubusercontent.com/assets/876195/23097362/b90d72ae-f657-11e6-921f-ecce79afa2ca.png)

![image details screen](https://cloud.githubusercontent.com/assets/876195/23097363/b90e95e4-f657-11e6-8da5-cbf363b61b4b.png)

Or, visit https://clicks.vishaltelangre.com for a live demo.

## What's the magic?

Put your images in `raw` directory.
For each image, add a `.info` file with the same name of image file.
See `raw/Yellow_Rose.info` file for an example.

## To run locally

```sh
$ yarn
$ yarn start
```

Visit http://localhost:3000 to locally running gallery.

## To build for production

```sh
$ yarn run build
```

Host the contents of `dist` directory on your website!

Check the `docs/nginx_config.md` document for an example configuration to host it with the help of NGINX web server.

## Copyright and License

Copyright (c) 2017, Vishal Telangre. All Rights Reserved.

This project is licenced under the [MIT License](LICENSE).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/PfwgcRiC73ERAe1WTDUo4DmM/vishaltelangre/static-gallery'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/PfwgcRiC73ERAe1WTDUo4DmM/vishaltelangre/static-gallery.svg' />
</a>
