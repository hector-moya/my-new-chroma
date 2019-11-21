import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(items: any, gradeID?: any): any {
    return items.filter(item => item.gradeID === gradeID);
  }

}
