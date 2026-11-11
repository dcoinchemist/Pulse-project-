# GOtv APK

1. Create a new GitHub repo and upload everything in this folder (keep `.github/workflows/build-apk.yml`).
2. Open the repo's **Actions** tab. The build starts on every push to `main`, or press **Run workflow**.
3. When it turns green, open the run and download **GOtv-apk** under Artifacts. Unzip it to get `GOtv.apk`.
4. Copy `GOtv.apk` to the tablet and install it (allow "install unknown apps" when asked).

Update the app: replace `gotv.html`, push, and download the new APK.
Release page: push a tag like `v1.0` and the APK is attached to a GitHub Release.
