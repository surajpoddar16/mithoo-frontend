import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chatFilter',
    pure: false
})
export class ChatFilterPipe implements PipeTransform {
    transform(items: any[], query: string): any {
      if (!items || !query) {
          return items;
      }

      return items.filter(function(item) {
        return item.friendAvatar.name.includes(query);
      });
    }
}
