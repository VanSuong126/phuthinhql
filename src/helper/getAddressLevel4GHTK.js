const GetDataAddressLevel4GHTK = async ({Tinh, Huyen, Xa}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Token', '0a5Dcd1eC3b03ECe894d3801c7709Ae7e0741635');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      `https://services.giaohangtietkiem.vn/services/address/getAddressLevel4?province=${Tinh}&district=${Huyen}&ward_street=${Xa}`,
      requestOptions,
    );

    if (response.ok) {
      const result = await response.text();
      return result;
    } else {
      console.error('Fetch failed with status:', response.status);
      throw new Error('Fetch failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error('An error occurred');
  }
};

export default GetDataAddressLevel4GHTK;
