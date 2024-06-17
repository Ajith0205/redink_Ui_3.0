import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import routes from '../routes';

function Adminappcontent() {
    return (
        <div>
          <Suspense>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element2 && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element2 />}
                    />
                  )
                );
              })}
            </Routes>
          </Suspense>
        </div>
      );
}

export default Adminappcontent
