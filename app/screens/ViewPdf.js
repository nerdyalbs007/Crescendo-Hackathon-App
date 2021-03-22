import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Print from 'expo-print';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

const htmlString = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Birth Letter</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
    />

    <style type="text/css">
      .section {
        height: 500px;
        background: gray;
        margin-bottom: 100px;
        display: inline-block;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div class="section"></div>

    <table style="width:100%; display: inline-table; clear: both;">
      <tr>
        <th>Type of Cloth</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
      <tr>
        <td>Shenai</td>
        <td>24</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Full Sleve</td>
        <td>4</td>
        <td>94</td>
      </tr>
      <tr>
        <td>Embroidrary</td>
        <td>2</td>
        <td>94</td>
      </tr>
    </table>
  </body>
</html>
`

export default function ViewPdf() {
    return (
      <View style={styles.container}>
        <Button
          title="Print HTML"
          onPress={() => Print.printAsync({
            html: htmlString,
            height: 842,
            width: 595,
          })}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
