import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {User} from "../../../entities/User";
import {UserService} from "../../../services/userService";
import {MapService} from "../../../services/mapService";
import {TaskService} from "../../../services/taskService";
import {interval} from "rxjs/index";
import {InventoryService} from "../../../services/inventoryService";
import {Router} from "@angular/router";

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private taskService: TaskService,
              private inventoryService: InventoryService,
              private mapService: MapService,
              private router: Router) {
  }

  user: User;
  visitedTiles = [];

  map: any;
  player: any;
  playerPosition: number[];
  currentTile: number[][];
  tileLayer: any;
  watchID: number;

  apiToken = environment.MAPBOX_API_KEY;
  defaultZoom: number = 18;

  // Debug Methods
  showDebug = false;
  displayTileLayer = false;

  ngOnInit() {
    this.user = this.userService.getUser();
    // Get Location
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => this.plotMap(position), () => console.log("Error: Player Position not found!"));
      // Real Movement
      this.watchID = window.navigator.geolocation.watchPosition(position => this.positionPlayer(position));
    }
  }

  ngOnDestroy(): void {
    window.navigator.geolocation.clearWatch(this.watchID);
  }

  plotMap(position: Position) {
    this.playerPosition = [position.coords.latitude, position.coords.longitude];
    // Set View and Config
    this.map = L.map('map', {
      doubleClickZoom: false,
      dragging: false,
      scrollWheelZoom: false
    }).setView(this.playerPosition, this.defaultZoom);
    this.map.maxZoom = 100;
    // Add Map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.dark',
      accessToken: this.apiToken
    }).addTo(this.map);
    // Spawn Player Marker
    this.player = L.marker(this.playerPosition).bindPopup(this.user.name).addTo(this.map);
    // Init Tiles around the Player
    let spawnTile = this.mapService.squareAroundMarker(this.playerPosition);
    this.currentTile = spawnTile;
    this.pushTilesAround(spawnTile);
  }

  // position for Real Data move for Mock data
  positionPlayer(position?: Position, move?: number[]) {
    if (position) {
      this.playerPosition = [position.coords.latitude, position.coords.longitude];
    }
    else if (move) {
      window.navigator.geolocation.clearWatch(this.watchID);
      this.playerPosition = [this.playerPosition[0] + move[0], this.playerPosition[1] + move[1]];
    }
    this.player.setLatLng(this.playerPosition);
    this.map.setView(this.playerPosition, this.defaultZoom);
    // Check if Player moved into new Tile
    if (!this.mapService.positionInsideSquare(this.playerPosition, this.currentTile)) {
      this.currentTile = this.mapService.getCurrentTile(this.playerPosition, this.visitedTiles);
      this.pushTilesAround(this.currentTile);
      // display tiles
      if (this.displayTileLayer) {
        this.showTileLayer();
        this.showTileLayer();
      }
    }
  }

  showTileLayer() {
    if (!this.displayTileLayer) {
      this.tileLayer = L.layerGroup();
      for (let tile of this.visitedTiles) {
        this.tileLayer.addLayer(L.polygon(tile).bindPopup(this.tileToString(tile)));
      }
      this.tileLayer.addTo(this.map);
    } else {
      this.map.removeLayer(this.tileLayer);
    }
    this.displayTileLayer = !this.displayTileLayer;
  }


  private tileToString(tile: number[][]): string {
    return tile[0][0] + " | " + tile[0][1] + "\n"
      + tile[1][0] + " | " + tile[1][1] + "\n"
      + tile[2][0] + " | " + tile[2][1] + "\n"
      + tile[3][0] + " | " + tile[3][1] + "\n"
  }

  private pushTilesAround(spawnTile: number[][]) {
    if (this.isNewTile(spawnTile)) {
      this.visitedTiles.push(spawnTile);
    }
    for (let i = 0; i < 8; i++) {
      let cand = this.mapService.nextSquare(spawnTile, this.loopDirections(i));
      if (this.isNewTile(cand)) {
        this.visitedTiles.push(cand);
      }
    }
  }

  private loopDirections(i: number): string {
    switch (i) {
      case 0:
        return 'Right';
      case 1:
        return 'Left';
      case 2:
        return 'Top';
      case 3:
        return 'Bottom';
      case 4:
        return 'Bottom Right';
      case 5:
        return 'Bottom Left';
      case 6:
        return 'Top Left';
      case 7:
        return 'Top Right';
    }
  }

  private isNewTile(cand: number[][]): boolean {
    for (let tile of this.visitedTiles) {
      // Get Pos inside of cand
      let coords = [cand[0][0] - 0.0001, cand[0][1] + 0.0001];
      if (this.mapService.positionInsideSquare(coords, tile)) {
        return false;
      }
    }
    this.spawnEvent(cand);
    return true;
  }

  private spawnEvent(cand: number[][]) {
    if (Math.random() <= 0.5) {
      let offsetx = Math.random() * 0.0005;
      let offsety = Math.random() * 0.0008;
      let position = [cand[0][0] - offsetx, cand[0][1] + offsety];

      let r = Math.floor(Math.random() * 4);
      let route = "";
      let iconLink = "";
      switch (r) {
        case 0:
          route = 'dashboard/crackCode';
          iconLink = '../../../assets/wooden-box.png';
          break;
        case 1:
          route = 'dashboard/quiz';
          iconLink = '../../../assets/questionMark.png';
          break;
        case 2:
          route = 'dashboard/minesweeper';
          iconLink = '../../../assets/transistor.png';
          break;
        case 3:
          route = 'dashboard/battle';
          iconLink = '../../../assets/crossed-swords.png';
          break;
      }

      let icon = L.icon({
        iconUrl: iconLink,
        iconSize: [38, 38], // size of the icon
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      let marker = L.marker(position, {icon: icon});
      marker.on('click', () => {
        this.map.removeLayer(marker);
        this.router.navigate([route]);
      }).addTo(this.map);
    }
  }

  mockWalkTo(direction: string) {
    let walk: number[];
    switch (direction) {
      case 'North':
        walk = [0.0001, 0];
        break;
      case 'East':
        walk = [0, 0.0001];
        break;
      case 'South':
        walk = [-0.0001, 0];
        break;
      case 'West':
        walk = [0, -0.0001];
        break;
    }
    this.positionPlayer(null, walk);
  }

  scanForPlayers() {
    this.router.navigate(['/dashboard/nearbyPlayers']);
  }
}
