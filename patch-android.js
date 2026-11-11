// Runs in CI after "npx cap add android".
// 1) lock the app to landscape  2) hide the system bars  3) keep the screen on
const fs = require('fs');
const path = require('path');

const manifest = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(manifest, 'utf8');
if (!/screenOrientation/.test(x)) {
  x = x.replace('<activity', '<activity android:screenOrientation="sensorLandscape"');
}
fs.writeFileSync(manifest, x);

const dir = 'android/app/src/main/java/com/gull/gotv';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'MainActivity.java'), `package com.gull.gotv;

import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private void hideBars() {
    WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    c.hide(WindowInsetsCompat.Type.systemBars());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    hideBars();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) hideBars();
  }
}
`);
console.log('Android project patched');
