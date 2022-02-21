import { PoMenuItem } from '@po-ui/ng-components';
import { Icon } from 'src/app/enums/icon';
import { Label } from 'src/app/enums/label';
import { Route } from 'src/app/enums/route';

const items: string[] = ['PRODUCT', 'USER'];

export const MenuItems: Array<PoMenuItem> = items.map<PoMenuItem>(
  (item: string) => {
    return {
      link: Route[item as keyof typeof Route],
      label: Label[item as keyof typeof Label],
      icon: Icon[item as keyof typeof Icon],
      shortLabel: Label[item as keyof typeof Label],
    };
  }
);
