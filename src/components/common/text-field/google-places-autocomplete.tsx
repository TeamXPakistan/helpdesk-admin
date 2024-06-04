import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { LocationInput } from '@ts-types/generated';
import React from 'react';
import Loader from '@components/common/spinner/spinner';
import { useTranslation } from 'react-i18next';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'


const libraries: Libraries = ['places'];
export default function GooglePlacesAutocomplete({
  onChange,
  data,
  errorMsg,
  label,
  placeholder,
  inputFieldStyle
}: {
  onChange: any;
  data?: LocationInput | string | null
  errorMsg?: string | null | undefined;
  placeholder: string
  label?: string | null | undefined;
  inputFieldStyle?: Object;
}) {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries,
  });

  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(autocompleteInstance) {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setAutocomplete(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    // console.log(autocomplete.place());
    if (!place.geometry || !place.geometry.location) {
      return;
    }
    const location: any = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      coordinates: [
        place.geometry.location.lat(),
        place.geometry.location.lng(),
      ],
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case 'postal_code': {
          location['zip'] = component.long_name;
          break;
        }

        case 'postal_code_suffix': {
          location['zip'] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case 'locality':
          location['city'] = component.long_name;
          break;

        case 'administrative_area_level_1': {
          location['state'] = component.short_name;
          break;
        }

        case 'country':
          location['country'] = component.long_name;
          break;
      }
    }
    if (onChange) {
      onChange(location);
    }
  };
  if (loadError) {
    return <div>{t('common:text-map-cant-load')}</div>;
  }
  return isLoaded ? (
    <>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
      >
        <CustomTextField1
          sx={inputFieldStyle}
          errorMsg={errorMsg}
          type="text"
          fullWidth
          label={label}
          defaultValue={data?.formattedAddress}
          placeholder={placeholder}
        />
      </Autocomplete>
    </>
  ) : (
    <Loader />
  );
}
