/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */

import iconMapping from 'common/icons/IconMapping';

class ProcessMMData {
  constructor() {
    this.idCounter = 1;
  }

  processRootList(rootList) {
    if (!rootList) {
      return rootList;
    }
    let result = [];
    rootList.forEach((node, index) => {
      if (!node.hasOwnProperty('id')) {
        node["id"] = this.idCounter++;
      }
      node['dir'] = '/';
      node["isRoot"] = true;
      node['root'] = node["id"];
      node['type'] = 'dir';
      node['relative_path_from_root'] = '/';

      result[index] = node;
    })
    return result;
  }

  processNodeList(nodeList, parentId) {
    if (!nodeList) {
      return nodeList;
    }
    let result = [];
    nodeList.forEach((node, index) => {
      if (!node.hasOwnProperty('id')) {
        node["id"] = this.idCounter++;
      }

      if (parentId) {
        node["parent_id"] = parentId;
      }
      node["size"] = node["size"] || 0;
      node["size"] = Math.round(node["size"] / 1000, -2) + " k";
      result[index] = node;
    })
    return result;
  }

  newFolderNode(currentNode, folderName) {
    let relativePathFromRoot = currentNode.relative_path_from_root ? currentNode.relative_path_from_root : '/';
    return {
      name: folderName,
      path: "http://vlms.dev/ufiles/5836b4a0840e8219a565c721/123",
      relative_path_from_root: relativePathFromRoot + "/" + folderName,
      date: new Date().getTime(),
      date_display: new Date(),
      is_dir: 1,
      size: "0 k",
      size_display: ".",
      type: "dir",
      id: this.idCounter++
    }
  }

  findNodeById(id, mediaList) {
    if (id === 0) {
      return mediaList;
    }
    return this.findNodeChildren(id, mediaList);
  }

  findChildrenById(id, mediaList) {
    if (id === 0) {
      return mediaList;
    }
    return this.findNodeChildren(id, mediaList);
  }

  findNodeChildren(id, nodes) {
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]['id'] === id) {
        result = nodes[i]['children'];
        if (result.length !== 0) {
          return result;
        }
      }
    }

    if (result.length === 0) {
      for (let i = 0; i < nodes.length; i++) {
        result = this.findNodeChildren(id, nodes[i]['children']);
        if (result.length !== 0) {
          return result;
        }
      }
    }
    return [];
  }

  generateNodeIconClass(node) {
    let icon = "";
    if (!node.type) {
      return "";
    }
    node.type = node.type.toLowerCase();
    switch (node.type) {
      case "dir":
        icon = iconMapping.mapping("folder");
        break;
      case "audio":
        icon = iconMapping.mapping("audio");
        break;
      case "image":
        icon = iconMapping.mapping("picture");
        break;
      default:
        icon = iconMapping.mapping("file");

    }
    return icon;
  }

}

let processMMData = new ProcessMMData();
export default processMMData;