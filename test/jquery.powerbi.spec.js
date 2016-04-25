(function () {
    'use strict';

    describe('jquery', function () {
        var $fixture = null;
        
        beforeAll(function () {
            $fixture = $('<div id="powerbi-fixture"></div>').appendTo(document.body);
        });

        afterAll(function () {
            $fixture.remove();
        });

        afterEach(function () {
            $fixture.empty();
        });

        it('calling .powerbi on a jQuery object calls the internal powerbi.embed using the element from the jquery object', function () {
            // Arrange
            var powerbiServiceMock = jasmine.createSpyObj('powerbiServiceMock', ['embed']);
            var originalPowerbi = window.powerbi;
            window.powerbi = powerbiServiceMock;
            
            var embedConfiguration = {
                type: 'report',
                accessToken: 'fakeToken',
                embedUrl: 'https://embed.powerbi.com/embed?reportId=123'
            };
            
            // Act
            $fixture.powerbi(embedConfiguration);
            
            // Assert
            expect(powerbiServiceMock.embed).toHaveBeenCalledWith($fixture.get(0), embedConfiguration);
            
            // Cleanup
            window.powerbi = originalPowerbi;
        });
        
        it('calling .powerbi on a jQuery object with embed configuration embeds iframe within element', function () {
            // Arrange
            var embedConfiguration = {
                type: 'report',
                accessToken: 'fakeToken',
                embedUrl: 'https://embed.powerbi.com/embed?reportId=123'
            };
            
            // Act
            $fixture.powerbi(embedConfiguration);
            
            // Assert
            var iframe = $fixture.find('iframe');
            expect(iframe.get(0)).not.toBeUndefined();
        });
        
        it('calling .powerbi returns the jQuery object to allow chaining', function () {
            // Arrange
            var embedConfiguration = {
                type: 'report',
                accessToken: 'fakeToken',
                embedUrl: 'https://embed.powerbi.com/embed?reportId=123'
            };
            
            // Act
            var returnValue = $fixture.powerbi(embedConfiguration);
            
            // Assert
            expect(returnValue).toBe($fixture);
        });
    });
} ());