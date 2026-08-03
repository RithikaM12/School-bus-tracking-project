# School-bus-tracking-project
 Work Flow 

                      START
                        │
                        ▼
                    User Login
            (Admin / Driver / Parent)
                        │
                        ▼
          Authentication & Verification
                        │
                        ▼
        ┌──────────────────────────┐
        │        User Role                                    │
        └──────────────────────────┘
           │                                     │             │
           ▼                                  ▼          ▼
        Admin                     Driver      Parent
           │                                      │              │
           │                                      │              │ 
           │                             Start Trip       │
Manage Buses,                    ▼           │
Drivers,Routes    GPS Location    │
& Students                    Enabled       │
           │                                      │              │
           │                                      ▼            │
           │                Live Location Sent│
           │              to Server/Database│
           │                           │                         │ 
           └──────────┼──────────┘
                      ▼
          System Updates Bus Status
                      │
                      ▼
      Notifications Sent to Parents
   (Departure, Arrival, Delay, ETA)
                      │
                      ▼
      Parent Views Live Bus Location
             on Mobile Application
                      │
                      ▼
        Bus Reaches School/Home
                      │
                      ▼
             Driver Ends Trip
                      │
                      ▼
        Trip Details Stored in Database
                      │
                      ▼
                     END
