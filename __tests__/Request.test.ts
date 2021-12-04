import TSRequest from '../src/Request';

test('Success request', () => {
  const successUrl: string = '../success-request.json';

  new TSRequest(successUrl, 'GET', [], {
    onSuccess: (responseData: any) => {
      expect(responseData.code.toBe(200));
      expect(responseData.message.toBe('Success message'));
      expect(responseData.html.toBe('HTML String or HTML Code'));
      expect(responseData.data.length.toBe(4));
    }
  });
});

test('Error request', () => {
  const errorUrl: string = '../not-exists.json';

  new TSRequest(errorUrl, 'GET', [], {
    onError: (responseData: any) => {
      expect(responseData.toBe(null));
    }
  });
});