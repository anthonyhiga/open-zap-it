# Design


# Prototyping



# Concepts
The design of OpenZapIt includes a handful of assuptions which previous light gun style toys
do not venture to make as it will require considerable more infra.

* All devices have WiFi connectivity
* Add devices have both an emitter and receiver for IR based communication

NOTE: The IR portion of this could be replaced by other technologies
* Examples include:  UV based communication, Visible light (e.g. Red Lasers)


# Terms
* Overmind - The central server responsible for mediating the OpenZapIt games.  It is responsible for tracking
scores as well as relaying vital information between player devices.  Because it is designed to be central and isnt' a distributed
service, the idea is for the overmind itself to be an onsite reasonably powered device which can run a webserver and respond to a decent
traffic load.  (The assumption is that games won't have more than ~100 players at most, so QPS should be relatively low)

# Flow 
There are several design choices here which place most of the burden of the game being run on the "Overmind".
Devices sending data over the IR emitter/receiver paths will only send identifiers.  To reduce the effect of cheating, a receiver will not have any
context into what the identifier is.  So it cannot afford to ignore received messages as it may include information
such as a "Beacon"  (Is an enemy near?)  "Ammunition" (Can I get more ammo?)

# Anti-Cheating
* TBD




