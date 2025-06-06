import { Component } from '@angular/core';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import packageJson from '../../../package.json';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { INFO_DIALOG_MODE } from '../shared/constants/dialogs-constants';
import { formatAppReleaseDate } from '../shared/labels/commons/commons';

@Component({
  selector: 'app-about',
  imports: [DialogComponent, MatTableModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public aboutDialogTitle!: string;
  public aboutDialogMode!: string;
  public test!: string;
  public releaseDate!: string;

  public packageJson = packageJson;

  public columnsIdentifiers: string[] = [
    'toolLeftName',
    'toolLeftVersion',
    'toolRightName',
    'toolRightVersion',
  ];
  public externalToolsList: MatTableDataSource<any> = new MatTableDataSource();

  constructor() {}

  ngOnInit(): void {
    this.aboutDialogTitle = `${packageJson.productName} - À propos`;
    this.aboutDialogMode = INFO_DIALOG_MODE;
    this.releaseDate = formatAppReleaseDate();

    this.externalToolsList.data.push({
      toolLeft: { name: 'NodeJS', version: packageJson.nodeJS },
      toolRight: {
        name: 'TypeScript',
        version: packageJson.devDependencies['typescript'].replace('^', ''),
      },
    });

    this.externalToolsList.data.push({
      toolLeft: {
        name: 'Angular',
        version: packageJson.dependencies['@angular/core'].replace('^', ''),
      },
      toolRight: {
        name: 'NGx Toastr',
        version: packageJson.dependencies['ngx-toastr'].replace('^', ''),
      },
    });

    this.externalToolsList.data.push({
      toolLeft: {
        name: 'Jasmine',
        version: packageJson.devDependencies['jasmine-core'].replace('^', ''),
      },
      toolRight: {
        name: 'Karma',
        version: packageJson.devDependencies['karma'].replace('^', ''),
      },
    });

    this.externalToolsList.data.push({
      toolLeft: {
        name: 'Better-SQLite3',
        version: packageJson.dependencies['better-sqlite3'].replace('^', ''),
      },
      toolRight: {
        name: 'Bcrypt',
        version: packageJson.dependencies['bcrypt'].replace('^', ''),
      },
    });

    this.externalToolsList.data.push({
      toolLeft: {
        name: 'Chart.js',
        version: packageJson.dependencies['chart.js'].replace('^', ''),
      },
      toolRight: {
        name: 'Flag Icons',
        version: packageJson.dependencies['flag-icons'].replace('^', ''),
      },
    });
  }
}
