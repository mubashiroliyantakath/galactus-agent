import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {ImageItem} from "@/lib/data";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type TransformedImageItem = {
  Id: string
  RepoTags: Array<String>
  name: string,
  version: string
}

export function transformImageList(imageList: ImageItem[]) {
  const transformedImageList: TransformedImageItem[] = []
  imageList.forEach(item => {
    if (item.RepoTags.length === 0) {
      transformedImageList.push({
        ...item,
        name: "<none>",
        version: "<none>"
      })
    } else {
      item.RepoTags.forEach(repoTag => {
        const version = repoTag.split(":").slice(-1)[0]
        const name = repoTag.split(":").slice(0,-1).join(":")
        transformedImageList.push({
          ...item,
          name: name,
          version: version
        });
      })
    }

  });
  return transformedImageList
}