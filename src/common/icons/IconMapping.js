/**
 * Created by Peter Hoang Nguyen on 4/7/2017.
 */

class IconMapping {
    FONT_AWESOME = 'font-awesome';
    MATERIAL_ICON = 'material_icon';

    mapping(icon, type) {
        if (!type) {
            type = this.MATERIAL_ICON;
        }
        switch (icon) {
            case 'home' :
                return "mi mi-home";
            case 'picture' :
                return "mi mi-image";
            case 'user' :
                return "mi mi-person";
            case 'folder' :
                return "mi mi-folder-open";
            case 'audio' :
                return "mi mi-audiotrack";
            case 'file' :
                return "mi mi-insert-drive-file";
            default:
                return ""
        }
    }
}
let iconMapping = new IconMapping();
export default iconMapping;