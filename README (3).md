# Chef Christoffel — Chef + Guest app with login screen

**Open this whole folder in Visual Studio Code.** This package includes a React Native / Expo application and a separate offline HTML preview that works immediately in a Windows browser. It contains **application code only** (no PoE document).

## What was added

- **Welcome / login screen** with two clear choices: **I'm the chef** and **I'm a guest**.
- **Chef sign in** with a username and password for a classroom demonstration.
- **Guest welcome screen** with featured dishes, course counts, and a button to explore the entire menu.
- **Guest browsing screen** with live search and filters, but no add/edit/delete/statistics controls.
- **Sign out** from either view, so you can change roles and demonstrate both flows.
- All prior chef actions remain: add, edit, delete, search, filter, and statistics. Saved menu items appear to both roles on the same app/device.

The Part 1 PDF includes dark/blue home, menu, and guest navigation concepts, **but not a separate login-screen mockup**. The new entry screen was designed to match that colour palette and layout rather than copied from a non-existent PDF page.

## Demo login

| Role | How to enter | What you can do |
| --- | --- | --- |
| Chef | Username **`chef`**, password **`Chef2026`** | Manage menu items and view statistics |
| Guest | Select **I'm a guest → Continue as Guest** | View featured dishes, browse/search/filter the menu |

**Security note:** The chef password is stored in application source for a classroom/demo only. This is not real authentication; do not store private data or deploy it as a secure multi-user service. The menu is stored locally, not synced between separate phones/browsers.

## Quickest way on Windows: offline preview

1. **Extract the ZIP** (don't try to run files from inside the ZIP).
2. Double-click **`OPEN_APP_NOW.bat`**.
3. Choose Chef or Guest on the first screen. Sign out to switch views.

This preview uses HTML/CSS/JS and local browser storage. It is **not** the React Native build. It is a quick way to demonstrate and inspect the screens.

## Run the real React Native app in VS Code

1. Install **Node.js LTS** and **Visual Studio Code**.
2. Extract the ZIP, then select **File → Open Folder** in VS Code.
3. Select **`ChefChristoffel_Guest_Chef_Login_VSCode`** (the folder containing `App.js`).
4. Open **Terminal → New Terminal** and run:

   ```powershell
   npm install
   npx expo install --fix
   npm run web
   ```

5. Expo prints a `localhost` URL; open it in your browser. If your browser does not open automatically, try `http://localhost:8081`.

Alternatively run `START_REACT_NATIVE_WEB.bat` after installing Node.js. To start Expo for a device/emulator, use `npm start` (or `START_REACT_NATIVE_PHONE.bat`). An appropriate Expo Go or development build may be needed depending on SDK compatibility.

### Tests

Run `npm run check` in the VS Code terminal. There are **10 automated tests** for menu logic and demo login checks. The offline browser version was additionally exercised for incorrect login, successful chef login, add/edit, sign out, guest access, search and hidden management controls.

**Runtime note:** The offline browser demo has been tested, but a full Expo launch has **not** been verified in this environment because Expo dependencies were not available for installation. You should run and check the React Native version on your own computer before presenting or submitting it.

## Source files

- `App.js`: the React Native role-aware navigation, actions and logout.
- `src/screens/LoginScreen.js`: role selection and local demo chef login.
- `src/screens/GuestHomeScreen.js`: guest landing screen.
- `src/screens/HomeScreen.js`: chef dashboard.
- `src/screens/MenuScreen.js`: chef management or guest read-only menu, depending on props.
- `src/screens/EditorScreen.js`: add/edit form.
- `src/screens/StatsScreen.js`: menu statistics.
- `src/hooks/useMenuStore.js`: local persistence.
- `src/utils/auth.js`: demo credential validation.
- `browser-preview/`: separate working offline preview.
- `screenshots/`: screenshots of the **browser preview**, not verified React Native screenshots.

For a new classroom assessment, test the Android / iOS build on the device used in your presentation.

## Harvard referencing

The following official documentation was consulted for the React Native components, Expo development workflow, menu storage, course picker, browser preview and Visual Studio Code setup used in this application. References are arranged alphabetically using the Harvard author–date style.

Expo (n.d.) *Start developing*. Available at: https://docs.expo.dev/get-started/start-developing/ (Accessed: 6 November 2026).

Meta Open Source (n.d.) *React: Learn React*. Available at: https://react.dev/learn (Accessed: 6 November 2026).

Mozilla (n.d.) *Window: localStorage property*. MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (Accessed: 6 November 2026).

React Native (n.d.) *FlatList*. Available at: https://reactnative.dev/docs/flatlist (Accessed: 6 November 2026).

React Native (n.d.) *TextInput*. Available at: https://reactnative.dev/docs/textinput (Accessed: 6 November 2026).

React Native Async Storage (n.d.) *Usage*. Available at: https://react-native-async-storage.github.io/2.0/Usage/ (Accessed: 6 November 2026).

React Native Community (n.d.) *@react-native-picker/picker*. GitHub. Available at: https://github.com/react-native-picker/picker (Accessed: 6 November 2026).

Visual Studio Code (n.d.) *Get started with Visual Studio Code*. Available at: https://code.visualstudio.com/docs/getstarted/overview (Accessed: 6 November 2026).

### How these sources relate to the app

- **React Native and React:** screen layout, form input, menu rendering, and component state.
- **Expo:** launching and testing the React Native project from the VS Code terminal.
- **React Native Async Storage:** storing menu information locally in the native app.
- **React Native Community Picker:** choosing a menu course from a dropdown.
- **MDN Web Docs:** saving menu information in the separate HTML/browser demonstration.
- **Visual Studio Code:** opening, editing and running the project folder.

> Note: These are technical documentation references. The Chef Christoffel interface design and app-specific code are project work, not quotations taken from those documentation pages.
