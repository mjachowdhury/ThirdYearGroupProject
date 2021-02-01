package com.project.transportAl.historyRecyclerView;
/**
 * Group -19
 * TransportAl Project
 * SDH3 & SD3
 */
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.project.transportAl.HistorySingleActivity;
import com.project.transportAl.R;


public class HistoryViewHolders extends RecyclerView.ViewHolder implements View.OnClickListener{
    //Variables
    public TextView rideId;
    public TextView time;
    public TextView destination;
    //Constructor
    public HistoryViewHolders(View itemView) {
        super(itemView);
        itemView.setOnClickListener(this);

        rideId = itemView.findViewById(R.id.rideId);
        time = itemView.findViewById(R.id.time);
        destination = itemView.findViewById(R.id.destination);
    }

    //Creating new intent
    @Override
    public void onClick(View v) {
        Intent intent = new Intent(v.getContext(), HistorySingleActivity.class);
        Bundle b = new Bundle();
        b.putString("rideId", rideId.getText().toString());
        intent.putExtras(b);
        v.getContext().startActivity(intent);
    }
}
