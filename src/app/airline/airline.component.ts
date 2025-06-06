import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';
import {
  getFormModeLabel,
  getSubmitButtonLabel,
  getResetButtonLabel,
  getRequiredFieldErrorMessage,
  getICAO_IATAFieldsErrorMessage,
  getAllWhitespaceFieldErrorMessage,
  getResetButtonIcon,
} from '../shared/labels/commons/form-common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AirlineService } from '../shared/services/airline.service';
import {
  EDIT_FORM_MODE,
  ICAO_IATA_CODE_PATTERN,
  MAX_LENGTH_ERROR,
  MIN_LENGTH_ERROR,
  ONLY_WHITESPACE_ERROR,
  PATTERN_ERROR,
  REQUIRED_ERROR,
} from '../shared/constants/forms-constants';
import {
  getAirlineFormSuccessNotificationMessage,
  getAirlineFormTitle,
  getCountryInputLabel,
  getIcaoCodeInputLabel,
  /*,*/ getLogoInputLabel,
  getNameInputLabel,
} from '../shared/labels/forms/airline-form';
import { AirlineMapper } from '../shared/mappers/AirlineMapper';
import { AsyncPipe } from '@angular/common';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { Country } from '../shared/models/Country';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import {
  getCountries,
  getCountryByName,
} from '../shared/utils/geographical-utils';
import { capitalize } from '../shared/utils/labels-utils';
import { onlyWhitespaceValueValidator } from '../shared/forms-validators/commons-validators';
import { ForbiddenComponent } from '../shared/components/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../shared/components/unauthorized/unauthorized.component';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'airline',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ToastrModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ForbiddenComponent,
    UnauthorizedComponent,
  ],
  templateUrl: './airline.component.html',
  styleUrls: [
    './airline.component.scss',
    '../shared/styles/common.scss',
    '../shared/styles/forms.scss',
    '../shared/styles/flag-icons.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirlineComponent implements OnInit {
  public authenticatedUser!: User;

  public countries: Country[] = getCountries();
  public countrySelectedFlag: string = 'xx';

  /* Form properties */
  public airlineForm!: FormGroup;
  public airlineFormTitle: string = '';
  public logoFileName: string = 'Aucun fichier';
  public logoFileFound: boolean = false;

  /* Form fields identifiers */
  public icaoFieldIdentifier: string = 'icao';
  public nameFieldIdentifier: string = 'name';
  public logoFieldIdentifier: string = 'logoFileChooser';
  public nationalityFieldIdentifier: string = 'nationality';

  /* Form fields labels */
  public icaoInputLabel: string = '';
  public nameInputLabel: string = '';
  public logoInputLabel: string = '';
  public nationalityInputLabel: string = '';

  /* Buttons labels */
  public submitButtonLabel: string = '';
  public resetButtonLabel: string = '';
  public resetButtonIcon: string = '';

  // List of countries matching to value entered in field
  public filteredCountries: Observable<Country[]> = new Observable<Country[]>();

  public airlineMapper: AirlineMapper = new AirlineMapper();

  constructor(
    readonly formBuilder: FormBuilder,
    readonly router: Router,
    readonly userService: UserService,
    readonly airlineService: AirlineService,
    readonly notificationService: NotificationService,
  ) {
    // Form fields creation and constraints definition
    this.airlineForm = this.formBuilder.group({
      icao: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp(ICAO_IATA_CODE_PATTERN)),
        ],
      ],
      name: [
        '',
        [Validators.required, onlyWhitespaceValueValidator().bind(this)],
      ],
      logo: [''],
      nationality: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.authenticatedUser = JSON.parse(user.toString());
      }
    });

    /* Form title, fields and buttons labels initialization */
    this.airlineFormTitle = `${getFormModeLabel(EDIT_FORM_MODE)} ${getAirlineFormTitle()}`;
    this.icaoInputLabel = getIcaoCodeInputLabel();
    this.nameInputLabel = getNameInputLabel();
    this.logoInputLabel = getLogoInputLabel();
    this.nationalityInputLabel = getCountryInputLabel();
    this.submitButtonLabel = getSubmitButtonLabel(EDIT_FORM_MODE);
    this.resetButtonLabel = getResetButtonLabel(EDIT_FORM_MODE);
    this.resetButtonIcon = getResetButtonIcon(EDIT_FORM_MODE);

    this.airlineService.findAirline().subscribe((airline) => {
      const initAirlineToEdit = this.airlineMapper.airlineFromDB(airline);

      // @ts-ignore
      this.filteredCountries = this.airlineForm
        .get(this.nationalityFieldIdentifier)
        ?.valueChanges.pipe(
          distinctUntilChanged(),
          startWith(''),
          map((country) =>
            country ? this.filter(country) : this.countries.slice(),
          ),
        );

      this.airlineForm.patchValue({
        icao: initAirlineToEdit?.icao,
        name: initAirlineToEdit?.name,
      });

      this.airlineForm
        .get(this.nationalityFieldIdentifier)
        ?.setValue(initAirlineToEdit?.nationality);
      this.countrySelectedFlag = initAirlineToEdit?.nationality.flagCode;
    });
  }

  displayCountry(country: Country): string {
    return country.name;
  }

  private filter(countryValue: any): Country[] {
    if (countryValue === null || countryValue === undefined) {
      return this.countries;
    }

    const filterValue: string =
      typeof countryValue === 'string'
        ? capitalize(countryValue)
        : capitalize(countryValue.name);
    return this.countries.filter((country) =>
      capitalize(country.name).startsWith(filterValue),
    );
  }

  // Nationality field listener
  addNationalityListener(countryValueChanged: any): void {
    if (countryValueChanged != null) {
      const filterValue: string =
        typeof countryValueChanged === 'string'
          ? capitalize(countryValueChanged)
          : capitalize(countryValueChanged.name);

      const countryFound = getCountryByName(filterValue);

      if (countryFound != undefined) {
        this.countrySelectedFlag = countryFound.flagCode;
      } else {
        this.countrySelectedFlag = 'xx';
      }
    }
  }

  checkFile(event: any): void {
    const fileUploaded: File = event.target.files[0];
    if (
      fileUploaded.name.endsWith('.ico') ||
      ['image/jpeg', 'image/png'].includes(fileUploaded.type)
    ) {
      this.airlineService.checkAirlineLogo().subscribe((paths) => {
        this.logoFileFound = paths.some(
          (path: any) => path.name === fileUploaded.name,
        );
        if (!this.logoFileFound) {
          this.notificationService.showWarning(
            'Attention',
            'Aucun fichier trouvé dans le dossier "images" de l\'application',
          );
        }
      });
      this.logoFileName = fileUploaded.name;
    } else {
      this.logoFileFound = false;
      this.logoFileName = 'Aucun fichier';
      this.notificationService.showError(
        'Erreur',
        "Le fichier sélectionné n'est pas une image au format PNG, ICO ou JPG/JPEG",
      );
    }
  }

  // ICAO field error message(s) display
  displayICAOErrorMessage(): string {
    if (
      this.airlineForm.get(this.icaoFieldIdentifier)?.hasError(REQUIRED_ERROR)
    ) {
      return getRequiredFieldErrorMessage();
    } else if (
      this.airlineForm
        .get(this.icaoFieldIdentifier)
        ?.hasError(MIN_LENGTH_ERROR) ||
      this.airlineForm
        .get(this.icaoFieldIdentifier)
        ?.hasError(MAX_LENGTH_ERROR) ||
      this.airlineForm.get(this.icaoFieldIdentifier)?.hasError(PATTERN_ERROR)
    ) {
      return getICAO_IATAFieldsErrorMessage();
    }
    return '';
  }

  // Name field error message(s) display
  displayNameErrorMessage(): string {
    if (
      this.airlineForm.get(this.nameFieldIdentifier)?.hasError(REQUIRED_ERROR)
    ) {
      return getRequiredFieldErrorMessage();
    } else if (
      this.airlineForm
        .get(this.nameFieldIdentifier)
        ?.hasError(ONLY_WHITESPACE_ERROR)
    ) {
      return getAllWhitespaceFieldErrorMessage();
    }
    return '';
  }

  // Form submit
  submitAirlineForm() {
    const airlineToDB = {
      ...this.airlineForm.value,
      icao: capitalize(this.airlineForm.get(this.icaoFieldIdentifier)?.value),
      logo: this.logoFileFound ? this.logoFileName : null,
      nationality: getCountryByName(
        typeof this.airlineForm.value.nationality === 'string'
          ? this.airlineForm.value.nationality
          : this.airlineForm.value.nationality.name,
      )?.id,
    };

    this.airlineService
      .updateAirline(this.airlineMapper.airlineToDB(airlineToDB))
      .subscribe(() => {
        this.notificationService.showSuccess(
          `${getFormModeLabel(EDIT_FORM_MODE)} ${getAirlineFormTitle()}`,
          `${getAirlineFormSuccessNotificationMessage(EDIT_FORM_MODE)}`,
        );
        this.notificationService.showInfo(
          'Information',
          "Si l'image du nouveau logo s'affiche mal, veuillez redémarrer l'application",
        );
        this.router.navigate(['home']);
      });
  }

  protected readonly document = document;
}
