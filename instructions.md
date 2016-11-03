# Welcome

Welcome to the Convoy frontend exercise, feel free to use whatever frameworks or libraries you are most comfortable with when doing the problem. Take your time and write code that you would hand off to your co-workers and push to production. Thanks and good luck!

# Truck Driver Checklist Web App

As a truck driver, the process of completing a shipment for a customer consists of a set of steps, where each is associated with a location. For example:

**Pickup**

- Arrive at the pickup location at a specific time
- Pick up the cargo as specified by the shipper. E.g. “5 pallets of paper”.
  - The cargo will also have a reference ID number to help the workers at the pickup ensure they put the right goods on the truck.
- Photograph the cargo
- Receive the Bill of Lading from the people at the pickup.

**Dropoff**

- Arrive at the dropoff location at a specific time
- Drop the cargo off
- Photograph the cargo to verify that it’s in good shape (no damage in transit)
- Get the [Bill of Lading][bol] signed by someone at the dropoff location

## The Assignment
Based on the above steps, please implement a web browser based checklist app for a truck driver.

Your customer is a truck driver, and you can assume that they have a laptop in the cab of their truck that can access the app you are building.

The app should present them with a list of jobs, each with a list of stops and tasks that the driver needs to complete. The driver also needs the ability to mark tasks as completed, and those changes should be persistent across app loads. When marking a task as complete please record the location and time of the user.

You do not need to code this from scratch. Feel free to build off a starter project and/or framework you are the strongest with.

Avoid creating an API and use either your own fixture data or copy an example from here: https://gist.github.com/JAStanton/08ed1952bc805e245021. As for persistence, one suggestion is to use [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

### Data

The top-level entity in this checklist is a Job. a Job consists of some metadata like Title and Reference Id and multiple Stops. Stops have metadata as well as multiple tasks.

A Job has:

- Title
- Reference ID
- Pickup Stop
- Dropoff Stop

A Pickup Stop has:

- Address
- Cargo Description - A text field that describes the load.
- Arrival Time - A time indicating when the driver should arrive.

A Dropoff Stop has:

- Address
- Arrival Time - A time indicating when the driver should arrive.

The tasks for a Pickup Stop are:

- Photograph Inventory
- Receive Bill of Lading

The tasks for a Dropoff Stop are:

- Photograph Inventory
- Bill of Lading Signed

*(Note persisting photos can be done with localstorage)*

Visually the checklist hierarchy looks like:

    [ ] Coals to Newcastle (Reference ID: 123456)
      [ ] Pickup address: 123 Fake St, Cargo description: 5 pallets, Arrival Time: 1/10/16 2:00pm
          [ ] Photograph Inventory
          [ ] Receive Bill of Lading
      [ ] Dropoff address: 456 Fake St, Cargo description: 3 pallets, Arrival Time: 1/10/16 4:00pm
          [ ] Photograph Inventory
          [ ] Bill of Lading Signed

A Job should be considered complete when all the the Stops are complete, and a stop should be complete when all the Tasks are complete. Similar to TodoMVC, the user should be able to filter Jobs by Active, Complete, All.

That's all, good luck!

[bol]: https://en.wikipedia.org/wiki/Bill_of_lading