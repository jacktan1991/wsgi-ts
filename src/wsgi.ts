type HeaderEntity = [string, string]

interface ErrType{}
interface Err{}
interface Traceback{}
type ExcInfo = [ErrType, Err, Traceback]

interface Environ {
  'REQUEST_METHOD': string,
  'SCRIPT_NAME': string,
  'PATH_INFO': string,
  'QUERY_STRING'?: string,
  'CONTENT_TYPE'?: string,
  /** etc... **/

  'wsgi.version': [number, number],
  'wsgi.url_scheme': "http" | "https",
  /** etc... **/

  'mod_python.some_variable'?: string,
}


interface Write {
  (data: string): void
}


interface StartResponse {
  (status: string, response_headers: HeaderEntity[], exc_info?: ExcInfo): Write
}


interface WSGIApplication {
  (environ: Environ, start_response: StartResponse): Iterable<string>
}

