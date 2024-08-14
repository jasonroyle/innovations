# NgRx

## Why NgRx?

As with all aspects in development, as applications increase in features more patterns and concepts are realised in order to maintain stability, limit complexity and maximise reuse. Historically, consuming data has been a relatively straight-forward process of HTTP requests and displaying response data, but as front-end technologies have evolved we are doing more and more with data on the client-side and state management has become a necessity for most modern applications, especially single page applications or progressive web apps where there is less reliance on server-side.

## Store Combination

### Module Architecture

When combining stores the architecture of modules needs to be carefully considered to avoid circular dependencies and restructuring as the app evolves.

Given the example of the Showroom app, there are multiple modules which combine feature store selectors for specific UI implementations. The module dependency graph of the Showroom app below illustrates how UI modules depend on multiple API modules in order to gather data from relevant resources.

![Showroom dependency graph](./assets/showroom-graph.png)

Focusing on the Vehicles UI module…

![Vehicles UI dependency graph](./assets/vehicles-ui-graph.png)

…we can see that vehicles are comprised of manufacturer, showroom, and vehicle data, for example, a Vehicle entity has a manufacturer ID but no direct reference to the name of the manufacturer. To achieve this, selectors from each API module are combined to create a new selector in the UI module.

```typescript
export const selectAllVehicleDetails = createSelector(selectAllVehicles, selectManufacturersEntities, selectShowroomsEntities, (vehicles, manufacturers, showrooms): VehicleDetail[] =>
  vehicles.map((vehicle) => ({
    manufacturer: manufacturers[vehicle.manufacturerId],
    showroom: vehicle.showroomId ? showrooms[vehicle.showroomId] : undefined,
    vehicle,
  }))
);
```

_[libs/vehicles/ui/src/lib/+state/vehicles-ui.selectors.ts](../libs/vehicles/ui/src/lib/+state/vehicles-ui.selectors.ts)_

When considering the use-case of combining manufacturer, showroom and vehicle data to construct the data required to display a vehicle, it might initially make sense to import the Manufacturers API and Showrooms API modules in the Vehicles API module, but this quickly falls apart when one of the dependencies also depends on vehicle data - at this point a circular dependency is formed and our app breaks. This is why we need to lift the combination layer to another module. The separation of API and UI is viable in most cases and is a clear separation of concerns for developers to recognise and maintain.
