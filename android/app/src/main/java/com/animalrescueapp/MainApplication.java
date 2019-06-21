package com.animalrescueapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.bottomactionsheet.RNBottomActionSheetPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.swmansion.reanimated.ReanimatedPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.facebook.appevents.AppEventsLogger;
import android.content.Intent;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
 
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {      
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),            
            new RNBottomActionSheetPackage(),
            new FBSDKPackage(mCallbackManager),
            new ReanimatedPackage(),
            new SnackbarPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();       
    SoLoader.init(this, /* native exopackage */ false);
  }
  
}
