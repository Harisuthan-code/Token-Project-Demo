import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor token{

  private var tokenOwns = HashMap.HashMap<Principal , Nat>(1 , Principal.equal , Principal.hash);
  private stable var entries : [(Principal, Nat)] = [];
  var free_count : Nat = 5000;
  var ownerId = Principal.fromText("Own Id");
  var ownerAmount = 1000000000;


  public shared(msg) func claim() : async Text{


    Debug.print(debug_show(msg.caller));

    let claimedPersons = tokenOwns.get(msg.caller);

    if(claimedPersons == null ){

        let result = await transfer_amount(msg.caller , free_count);

        if(result == "Tranfer Sucess"){

          return "Sucess";
        }

        else{

          return "token is Over"
        }

    }

    else{

        return "You Have aldreay claimed";

    };


  };




  public func check_balance(who : Principal):async Nat{

    let balance : Nat = switch (tokenOwns.get(who)){

      case null 0;
      case (?result) result;
    };

    Debug.print(debug_show(balance));

    return balance;



  };


  public shared(msg) func transfer_amount(toowner : Principal , amount_transfer : Nat) : async Text{


  let balance : Nat = switch (tokenOwns.get(msg.caller)){

      case null 0;
      case (?result) result;
  };

  let secondpersonbalance : Nat = switch (tokenOwns.get(toowner)){

    case null 0;
    case (?result) result;



  };

  if(balance > amount_transfer){

    let fromaccountbalance : Nat = balance - amount_transfer;

    tokenOwns.put(msg.caller , fromaccountbalance);


    let toAccountbalance : Nat = secondpersonbalance + amount_transfer;
    tokenOwns.put(toowner , toAccountbalance);

    return "Tranfer Sucess";

  }

  else{

    return "insufficent Amount"
  }


  


  };

  system func preupgrade() {
        entries := Iter.toArray(tokenOwns.entries());
    };

  system func postupgrade() {
      tokenOwns := HashMap.fromIter<Principal, Nat>(entries.vals(), 1, Principal.equal, Principal.hash);

      if(tokenOwns.size() < 1){

          tokenOwns.put(ownerId , ownerAmount);


      }
  };





}