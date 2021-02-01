package com.project.transportAl.Login;
/**
 * Group -19
 * TransportAl Project
 * SDH3 & SD3
 */
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.project.transportAl.R;
import com.project.transportAl.onAppKilled;

/**
 * Lunching screen of the class from there user can select customer or driver
 */
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button mSignIn = findViewById(R.id.signIn);
        Button mRegister = findViewById(R.id.register);

        startService(new Intent(MainActivity.this, onAppKilled.class));
        mSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                startActivity(intent);
                return;
            }
        });

        mRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, RegisterActivity.class);
                startActivity(intent);
                return;
            }
        });
    }
}
