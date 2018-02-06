Video: https://monosnap.com/file/Xn9bZR9L9OhfhyjZW7K4MYUsIO6T2V

Install dependencies:
```sh
yarn install
```

to run on ios use:
```
yarn ios
```

to run on android use:
```
yarn android
```

⛱️ 🌩️🙏

This app was developed in ~8 hours so it might look like hackathon grade code in some places. I got few animations from [ninarynska](https://dribbble.com/ninarynska) so it'll not hurt your eyes.

Few things could be done better. Although that this app will work on android it'll look and feel a bit 'differend'
Todo's:
- move hardcoded values to consts, notes component uses a lot of values that should be calculated
- abbility to edit notes
- due to this issue [react-native#17118](https://github.com/facebook/react-native/issues/17118) android has no animation when toggling items on the list
- check how it looks on something less performant than S8/iPhone 6
- add some async actions 🤫
