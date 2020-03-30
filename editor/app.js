import { ViewPort, TileMap, Camera, GameElement } from 'game-dong';
// import RuledCell from './model/RuledCell.model';
import ViewPortMouseController from './ui/viewport.mouse-controller';

class Editor extends GameElement {
    constructor() {
        super();
        
        this.createViewport();
        this.createMap();
        this.createCamera();
        this.render();
        this.setupListener();
    }

    getZoomLevel() {
        return this.map.getNbColumns() / (2 * this.camera.radius);
    }

    setupListener() {
        this.listen('viewport-pointer-move', event => {
            const mapCoords = this.convertCoordsViewPortToScene(
                event.detail.position
            );

            this.emit('map-pointer-move', {
                detail: {
                    position: mapCoords
                }
            });
        });

        this.listen('viewport-click', event => {
            const mapCoords = this.convertCoordsViewPortToScene(
                event.detail.position
            );

            const map = this.map;
            // +0.5 cause we use the middle of pointer as real point, not the origin
            mapCoords.x = Math.floor(mapCoords.x * map.getNbColumns() + 0.5);
            mapCoords.y = Math.floor(mapCoords.y * map.getNbRows() + 0.5);

            console.log('click', mapCoords.x, mapCoords.y);
        });
    }

    // convert normalized position into cell-map position
    convertCoordsViewPortToScene(position) {
        const n_positionInViewport = position;
        const n_cameraPos = this.camera.getPosition();

        const zoom = this.getZoomLevel();

        // camera position is normalized in map coordinates [0..1]
        // pointer is normalized in viewport coordinates [0..1]
        // -0.5 cause camera is always in center of canvas
        const x = ((n_positionInViewport.x - 0.5) / zoom) + n_cameraPos.x;
        const y = ((n_positionInViewport.y - 0.5) / zoom) + n_cameraPos.y;
        return { x, y };
    }

    createViewport() {
        this.viewport = new ViewPort({
            container: 'gd-main-viewport',
            size: {
                width: 500,
                height: 500
            },

            MouseController: ViewPortMouseController
        });
    }

    createMap() {
        this.map = new TileMap({
            name: 'tile-map',
            nbRows: 100,
            nbColumns: 100
        });
    }

    createCamera() {
        this.camera = new Camera({
            radius: 50,
            position: {
                x: 0.5,
                y: 0.5
            }
        });
    
        this.camera.setScene(this.map);
        const { width, height } = this.viewport.getResolution();

        const zoom = this.getZoomLevel();
        const scale = this.map.getNbColumns() / zoom;
        const pointer = this.viewport.get('pointer');

        pointer.setSize({
            width: width / scale ,
            height: height / scale,
        });
    }

    render() {
        this.viewport.clear();
        this.camera.snapshot(this.viewport);
    }

    tick() {
        // this.entities.forEach(elt => elt.tick(this.map));
        // this.entities.forEach(elt => elt.mutation());
    }

    clear() {
        // this.entities.forEach(cell => {
        //     cell.die();
        // });
    }
}


export default Editor;